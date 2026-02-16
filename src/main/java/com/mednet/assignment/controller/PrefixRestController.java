package com.mednet.assignment.controller;

import com.mednet.assignment.dao.PrefixDAO;
import com.mednet.assignment.model.Prefix;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/prefix")
@CrossOrigin(origins = "*")
public class PrefixRestController {

    @Autowired
    private PrefixDAO prefixDAO;

    // List all records with pagination support (Source 144)
    @GetMapping(value = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> listAll() {
        try {
            System.out.println("PrefixRestController: listAll() called");
            List<Prefix> prefixes = prefixDAO.getAllPrefixes();
            System.out.println("PrefixRestController: Retrieved " + prefixes.size() + " prefixes");
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", prefixes);
            response.put("total", prefixes.size());
            return response;
        } catch (Exception e) {
            System.err.println("Error in listAll(): " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error fetching prefixes: " + e.getMessage());
            response.put("data", new java.util.ArrayList<>());
            response.put("total", 0);
            return response;
        }
    }

    // Create record (Source 142)
    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> create(@RequestBody Prefix prefix) {
        try {
            System.out.println("PrefixRestController: create() called with: " + prefix.getPrefixName());
            prefixDAO.savePrefix(prefix);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Prefix saved successfully");
            return response;
        } catch (Exception e) {
            System.err.println("Error in create(): " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error saving prefix: " + e.getMessage());
            return response;
        }
    }

    // Delete record (Source 144)
    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> delete(@PathVariable Long id) {
        try {
            System.out.println("PrefixRestController: delete() called for id: " + id);
            prefixDAO.deletePrefix(id);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Prefix deleted successfully");
            return response;
        } catch (Exception e) {
            System.err.println("Error in delete(): " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error deleting prefix: " + e.getMessage());
            return response;
        }
    }
}