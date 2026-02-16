package com.mednet.assignment.controller;

import com.mednet.assignment.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/excel")
public class ExcelController {

    @Autowired
    private ExcelService excelService;

    @GetMapping("/download")
    public void downloadExcel(HttpServletResponse response) throws IOException {
        excelService.downloadExcel(response);
    }

    @PostMapping("/upload")
    public String uploadExcel(@RequestParam("file") MultipartFile file) throws IOException {
        return excelService.uploadExcel(file);
    }

    @GetMapping("/template")
    public void downloadTemplate(HttpServletResponse response) throws IOException {
        excelService.downloadTemplate(response);
    }
}
