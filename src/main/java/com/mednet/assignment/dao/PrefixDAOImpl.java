package com.mednet.assignment.dao;

import com.mednet.assignment.model.Prefix;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
@Transactional
public class PrefixDAOImpl implements PrefixDAO {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public void savePrefix(Prefix prefix) {
        System.out.println("PrefixDAOImpl: Saving prefix - " + prefix.getPrefixName());
        sessionFactory.getCurrentSession().saveOrUpdate(prefix);
        System.out.println("PrefixDAOImpl: Prefix saved successfully");
    }

    @Override
    public List<Prefix> getAllPrefixes() {
        System.out.println("PrefixDAOImpl: Fetching all prefixes");
        List<Prefix> prefixes = sessionFactory.getCurrentSession()
                .createQuery("from Prefix", Prefix.class).list();
        System.out.println("PrefixDAOImpl: Found " + prefixes.size() + " prefixes");
        return prefixes;
    }

    @Override
    public void deletePrefix(Long id) {
        System.out.println("PrefixDAOImpl: Deleting prefix with id - " + id);
        Session session = sessionFactory.getCurrentSession();
        Prefix prefix = session.get(Prefix.class, id);
        if (null != prefix) {
            session.delete(prefix);
            System.out.println("PrefixDAOImpl: Prefix deleted successfully");
        } else {
            System.out.println("PrefixDAOImpl: Prefix not found with id - " + id);
        }
    }
}