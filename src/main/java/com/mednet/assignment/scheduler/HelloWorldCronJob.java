package com.mednet.assignment.scheduler;

import com.mednet.assignment.service.CronStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;

@Component
public class HelloWorldCronJob {

    @Autowired
    private CronStatusService cronStatusService;

    @Scheduled(cron = "${cron.helloWorld:*/15 * * * * *}")
    public void runHelloWorld() {
        cronStatusService.recordHelloWorldTrigger();
        System.out.println("HelloWorldCronJob triggered at: " + ZonedDateTime.now());
    }
}

