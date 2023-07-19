package ru.kata.spring.boot_security.demo.configs;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import ru.kata.spring.boot_security.demo.converters.RoleConverter;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    private final RoleConverter roleConverter;

    @Autowired
    public MvcConfig(RoleConverter roleConverter) {
        this.roleConverter = roleConverter;
    }

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/user").setViewName("user");
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(roleConverter);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
