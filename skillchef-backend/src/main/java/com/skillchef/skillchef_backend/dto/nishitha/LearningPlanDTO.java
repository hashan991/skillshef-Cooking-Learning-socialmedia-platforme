package com.skillchef.skillchef_backend.dto.nishitha;



import java.util.List;

public class LearningPlanDTO {

    private String title;
    private String description;
    private List<StepDTO> steps;

    public static class StepDTO {
        private String step;
        private boolean completed;

        // Constructors
        public StepDTO() {}
        public StepDTO(String step, boolean completed) {
            this.step = step;
            this.completed = completed;
        }

        // Getters & Setters
        public String getStep() {
            return step;
        }

        public void setStep(String step) {
            this.step = step;
        }

        public boolean isCompleted() {
            return completed;
        }

        public void setCompleted(boolean completed) {
            this.completed = completed;
        }
    }

    // Constructors
    public LearningPlanDTO() {}
    public LearningPlanDTO(String title, String description, List<StepDTO> steps) {
        this.title = title;
        this.description = description;
        this.steps = steps;
    }

    // Getters & Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<StepDTO> getSteps() {
        return steps;
    }

    public void setSteps(List<StepDTO> steps) {
        this.steps = steps;
    }
}
