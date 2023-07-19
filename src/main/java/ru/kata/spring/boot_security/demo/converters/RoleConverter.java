package ru.kata.spring.boot_security.demo.converters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;

@Component
public class RoleConverter implements Converter<String, Role> {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleConverter(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role convert(String name) {
        return roleRepository.findByName(name).orElse(null);
    }
}
