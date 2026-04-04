package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private List<String> employees = new ArrayList<>();

    @GetMapping
    public List<String> getEmployees() {
        return employees;
    }

    @PostMapping
    public String addEmployee(@RequestBody String name) {
        employees.add(name);
        return "Employee added";
    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable int id) {
        employees.remove(id);
        return "Employee deleted";
    }
}
