package kr.bit.config;


import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import javax.sql.DataSource;
import java.util.Properties;


@Configuration
@MapperScan(basePackages = {"kr.bit.mapper"})
@PropertySource({"classpath:database.properties"})
@PropertySource({"classpath:email.properties"})
public class RootAppContext {
    @Autowired
    private Environment env;

    @Value("${email.email}")
    String email;
    @Value("${email.password}")
    String ePassword;

    @Bean
    public DataSource myDataSource() {
        HikariConfig hikari = new HikariConfig();
        hikari.setDriverClassName(env.getProperty("jdbc.driver"));
        hikari.setJdbcUrl(env.getProperty("jdbc.url"));
        hikari.setUsername(env.getProperty("jdbc.user"));
        hikari.setPassword(env.getProperty("jdbc.password"));

        HikariDataSource myDataSource = new HikariDataSource(hikari);
        return myDataSource;
    }

    @Bean
    public SqlSessionFactory sessionFactory() throws Exception {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(myDataSource());
        return (SqlSessionFactory) sessionFactory.getObject();
    }

    @Bean
    public JavaMailSenderImpl mailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername(email);
        mailSender.setPassword(ePassword);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.debug", "true");

        return mailSender;
    }
}

