package com.mednet.assignment.model;

import javax.persistence.*;

@Entity
@Table(name = "prefix_master")
public class Prefix {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //[cite_start]// Explicitly map the Java field to the exact SQL column name [cite: 144]
    @Column(name = "prefix_name", nullable = false)
    private String prefixName;

    @Column(name = "gender")
    private String gender;

    @Column(name = "prefix_of")
    private String prefixOf;
    // Getter and Setter for ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for prefixName
    public String getPrefixName() {
        return prefixName;
    }

    public void setPrefixName(String prefixName) {
        this.prefixName = prefixName;
    }

    // Getter and Setter for gender
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    // Getter and Setter for prefixOf
    public String getPrefixOf() {
        return prefixOf;
    }

    public void setPrefixOf(String prefixOf) {
        this.prefixOf = prefixOf;
    }
}