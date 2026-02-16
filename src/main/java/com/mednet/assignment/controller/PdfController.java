package com.mednet.assignment.controller;

import com.mednet.assignment.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/pdf")
public class PdfController {

    @Autowired
    private PdfService pdfService;

    @Autowired
    private ServletContext servletContext;

    @GetMapping("/generate")
    public void generatePdf(HttpServletResponse response)
            throws IOException, InterruptedException {

        pdfService.generatePdf(servletContext, response);
    }

    @GetMapping("/download")
    public void downloadExistingPdf(HttpServletResponse response)
            throws IOException {

        pdfService.downloadExistingPdf(servletContext, response);
    }
}
