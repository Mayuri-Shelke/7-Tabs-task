package com.mednet.assignment.controller;

import com.mednet.assignment.service.CronStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/cron")
public class CronController {

    @Autowired
    private CronStatusService cronStatusService;

    @GetMapping("/status")
    public Map<String, Object> status() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.putAll(cronStatusService.getStatus());
        return response;
    }
}

