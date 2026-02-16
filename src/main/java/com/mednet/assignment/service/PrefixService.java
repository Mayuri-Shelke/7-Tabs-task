package com.mednet.assignment.service;

import com.mednet.assignment.dao.PrefixDAO;
import com.mednet.assignment.model.Prefix;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * DWR Service for Tab 4 - Entry/List using Hibernate + DWR
 */
@Service("prefixService")
public class PrefixService {

    @Autowired
    private PrefixDAO prefixDAO;

    @Transactional(rollbackFor = Exception.class)
    public void savePrefix(Prefix prefix) {
        prefixDAO.savePrefix(prefix);
    }


    @Transactional(readOnly = true)
    public List<Prefix> getAllPrefixes() {
        return prefixDAO.getAllPrefixes();
    }

    public void deletePrefix(Long id) {
        prefixDAO.deletePrefix(id);
    }

    public Prefix getPrefixById(Long id) {
        List<Prefix> allPrefixes = prefixDAO.getAllPrefixes();
        for (Prefix p : allPrefixes) {
            if (p.getId().equals(id)) {
                return p;
            }
        }
        return null;
    }
}
