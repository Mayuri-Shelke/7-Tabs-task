package com.mednet.assignment.service;

import com.mednet.assignment.model.Prefix;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@Service
public class PdfService {

    @Autowired
    private PrefixService prefixService;

    private static final String PDF_OUTPUT_NAME = "database-report.pdf";

    public void generatePdf(ServletContext servletContext, HttpServletResponse response)
            throws IOException, InterruptedException {

        String scriptPath = "puppeteer-pdf/generate-pdf.js";
        String pdfPath = "puppeteer-pdf/" + PDF_OUTPUT_NAME;

        File scriptFile = findFile(servletContext, scriptPath);
        File puppeteerDir = scriptFile != null ? scriptFile.getParentFile() : null;

        if (scriptFile == null || !scriptFile.exists() || puppeteerDir == null) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Error: Script file not found.");
            return;
        }

        // Build HTML with database table (prefix_master) and write to temp file
        File htmlFile = new File(puppeteerDir, "pdf-content.html");
        String html = buildHtmlWithTable(prefixService.getAllPrefixes());
        try (Writer w = new OutputStreamWriter(new FileOutputStream(htmlFile), "UTF-8")) {
            w.write(html);
        }

        ProcessBuilder pb = new ProcessBuilder("node", scriptFile.getAbsolutePath(), htmlFile.getAbsolutePath());
        pb.directory(puppeteerDir);

        try {
            Process process = pb.start();
            int exitCode = process.waitFor();

            File pdfFile = new File(puppeteerDir, PDF_OUTPUT_NAME);
            if (exitCode == 0 && pdfFile.exists()) {
                sendPdfToResponse(pdfFile, response, PDF_OUTPUT_NAME);
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Error generating PDF. Exit code: " + exitCode);
            }

        } catch (IOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("Node.js not installed or not in PATH.");
        }
    }

    private String buildHtmlWithTable(List<Prefix> prefixes) {
        StringBuilder rows = new StringBuilder();
        for (Prefix p : prefixes) {
            rows.append("<tr>")
                .append("<td>").append(escape(p.getId())).append("</td>")
                .append("<td>").append(escape(p.getPrefixName())).append("</td>")
                .append("<td>").append(escape(p.getGender())).append("</td>")
                .append("<td>").append(escape(p.getPrefixOf())).append("</td>")
                .append("</tr>");
        }
        return "<!DOCTYPE html>\n" +
            "<html>\n" +
            "<head>\n" +
            "  <meta charset=\"UTF-8\">\n" +
            "  <style>\n" +
            "    body { font-family: Arial, sans-serif; padding: 20px; margin: 0; }\n" +
            "    h1 { color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; }\n" +
            "    .subtitle { color: #666; margin-bottom: 20px; }\n" +
            "    table { border-collapse: collapse; width: 100%; margin-top: 20px; }\n" +
            "    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }\n" +
            "    th { background: #667eea; color: white; }\n" +
            "    tr:nth-child(even) { background: #f9f9f9; }\n" +
            "    .footer { margin-top: 30px; font-size: 12px; color: #888; }\n" +
            "  </style>\n" +
            "</head>\n" +
            "<body>\n" +
            "  <h1>Database Report – Prefix Master Table</h1>\n" +
            "  <p class=\"subtitle\">Generated from database (prefix_master). Tab 7 – PDF download.</p>\n" +
            "  <table>\n" +
            "    <thead><tr><th>ID</th><th>Prefix Name</th><th>Gender</th><th>Prefix Of</th></tr></thead>\n" +
            "    <tbody>\n" + rows.toString() + "\n</tbody>\n" +
            "  </table>\n" +
            "  <div class=\"footer\">Generated on: " + new java.util.Date() + "</div>\n" +
            "</body>\n" +
            "</html>";
    }

    private static String escape(Object o) {
        if (o == null) return "";
        return o.toString().replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;");
    }

    public void downloadExistingPdf(ServletContext servletContext, HttpServletResponse response)
            throws IOException {

        String pdfPath = "puppeteer-pdf/" + PDF_OUTPUT_NAME;
        File pdfFile = findFile(servletContext, pdfPath);

        if (pdfFile != null && pdfFile.exists()) {
            sendPdfToResponse(pdfFile, response, PDF_OUTPUT_NAME);
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("PDF file not found. Please generate it first.");
        }
    }

    // ===========================
    // Helper Methods
    // ===========================

    private File findFile(ServletContext servletContext, String relativePath) {

        String appPath = servletContext.getRealPath("/");
        File projectRoot = null;

        // Strategy 1: Navigate from app path
        if (appPath != null) {
            File current = new File(appPath);
            for (int i = 0; i < 5 && current != null; i++) {
                current = current.getParentFile();
                if (current != null) {
                    File testFile = new File(current, relativePath);
                    if (testFile.exists()) {
                        return testFile;
                    }
                }
            }
        }

        // Strategy 2: user.dir
        projectRoot = new File(System.getProperty("user.dir"));
        File testFile = new File(projectRoot, relativePath);
        if (testFile.exists()) {
            return testFile;
        }

        return null;
    }

    private void sendPdfToResponse(File pdfFile, HttpServletResponse response, String filename)
            throws IOException {

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + filename + "\"");

        try (FileInputStream fis = new FileInputStream(pdfFile);
             OutputStream os = response.getOutputStream()) {

            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = fis.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
        }
    }
}
