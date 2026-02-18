package com.mednet.assignment.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class CronStatusService {

    /** Spring cron format: second minute hour day month dayOfWeek. Configurable via cron.properties (cron.helloWorld). */
    private final String cronExpression;

    private final AtomicReference<Instant> lastTriggeredAt = new AtomicReference<>(null);
    private final AtomicLong runCount = new AtomicLong(0);

    public CronStatusService(@Value("${cron.helloWorld:0 * * * * *}") String cronExpression) {
        this.cronExpression = cronExpression != null ? cronExpression : "0 * * * * *";
    }

    public void recordHelloWorldTrigger() {
        lastTriggeredAt.set(Instant.now());
        runCount.incrementAndGet();
    }

    public Map<String, Object> getStatus() {
        Map<String, Object> status = new LinkedHashMap<>();

        Instant last = lastTriggeredAt.get();
        ZonedDateTime serverNow = ZonedDateTime.now();

        status.put("jobName", "helloWorldCron");
        status.put("message", "Hello World");
        status.put("cronExpression", cronExpression);
        status.put("runCount", runCount.get());

        status.put("serverTime", format(serverNow.toInstant()));
        status.put("serverTimeZone", ZoneId.systemDefault().toString());

        status.put("lastTriggeredAt", last == null ? null : format(last));
        status.put("lastTriggeredAtEpochMs", last == null ? null : last.toEpochMilli());

        if (last == null) {
            status.put("note", "Job has not triggered yet (or server just started).");
        }

        return status;
    }

    private static String format(Instant instant) {
        return DateTimeFormatter.ISO_OFFSET_DATE_TIME
                .format(instant.atZone(ZoneId.systemDefault()));
    }
}

