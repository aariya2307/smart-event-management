package com.college.smarteventmanagement.model;

import java.sql.Timestamp;

public class ParticipantPerformance {

    private int performanceId;
    private int participantId;
    private int eventId;

    private int participationScore;
    private int engagementScore;
    private int taskQualityScore;
    private int presentationScore;
    private int teamContributionScore;

    private int totalScore;
    private double performancePercentage;

    private String remarks;
    private int evaluatedBy;
    private Timestamp evaluationDate;

    public ParticipantPerformance() {}

    public ParticipantPerformance(int performanceId, int participantId, int eventId,
                                  int participationScore, int engagementScore,
                                  int taskQualityScore, int presentationScore,
                                  int teamContributionScore, int totalScore,
                                  double performancePercentage, String remarks,
                                  int evaluatedBy, Timestamp evaluationDate) {

        this.performanceId = performanceId;
        this.participantId = participantId;
        this.eventId = eventId;
        this.participationScore = participationScore;
        this.engagementScore = engagementScore;
        this.taskQualityScore = taskQualityScore;
        this.presentationScore = presentationScore;
        this.teamContributionScore = teamContributionScore;
        this.totalScore = totalScore;
        this.performancePercentage = performancePercentage;
        this.remarks = remarks;
        this.evaluatedBy = evaluatedBy;
        this.evaluationDate = evaluationDate;
    }

    public int getPerformanceId() {
        return performanceId;
    }

    public void setPerformanceId(int performanceId) {
        this.performanceId = performanceId;
    }

    public int getParticipantId() {
        return participantId;
    }

    public void setParticipantId(int participantId) {
        this.participantId = participantId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public int getParticipationScore() {
        return participationScore;
    }

    public void setParticipationScore(int participationScore) {
        this.participationScore = participationScore;
    }

    public int getEngagementScore() {
        return engagementScore;
    }

    public void setEngagementScore(int engagementScore) {
        this.engagementScore = engagementScore;
    }

    public int getTaskQualityScore() {
        return taskQualityScore;
    }

    public void setTaskQualityScore(int taskQualityScore) {
        this.taskQualityScore = taskQualityScore;
    }

    public int getPresentationScore() {
        return presentationScore;
    }

    public void setPresentationScore(int presentationScore) {
        this.presentationScore = presentationScore;
    }

    public int getTeamContributionScore() {
        return teamContributionScore;
    }

    public void setTeamContributionScore(int teamContributionScore) {
        this.teamContributionScore = teamContributionScore;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }

    public double getPerformancePercentage() {
        return performancePercentage;
    }

    public void setPerformancePercentage(double performancePercentage) {
        this.performancePercentage = performancePercentage;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public int getEvaluatedBy() {
        return evaluatedBy;
    }

    public void setEvaluatedBy(int evaluatedBy) {
        this.evaluatedBy = evaluatedBy;
    }

    public Timestamp getEvaluationDate() {
        return evaluationDate;
    }

    public void setEvaluationDate(Timestamp evaluationDate) {
        this.evaluationDate = evaluationDate;
    }
}