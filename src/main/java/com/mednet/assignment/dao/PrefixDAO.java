package com.mednet.assignment.dao;

import com.mednet.assignment.model.Prefix;
import java.util.List;

public interface PrefixDAO {
    void savePrefix(Prefix prefix);
    List<Prefix> getAllPrefixes();
    void deletePrefix(Long id);
}