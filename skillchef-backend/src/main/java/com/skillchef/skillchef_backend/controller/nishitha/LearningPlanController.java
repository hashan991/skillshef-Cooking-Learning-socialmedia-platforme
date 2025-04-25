package com.skillchef.skillchef_backend.controller.nishitha;

import com.skillchef.skillchef_backend.model.nishitha.LearningPlan;
import com.skillchef.skillchef_backend.service.nishitha.LearningPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/plans")
public class LearningPlanController {

    @Autowired
    private LearningPlanService learningPlanService;

    // Create a plan
    @PostMapping
    public EntityModel<LearningPlan> createPlan(@RequestBody LearningPlan plan) {
        LearningPlan created = learningPlanService.createPlan(plan);
        return toModel(created);
    }

    // Get all plans
    @GetMapping
    public CollectionModel<EntityModel<LearningPlan>> getAllPlans() {
        List<EntityModel<LearningPlan>> plans = learningPlanService.getAllPlans().stream()
                .map(this::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(plans,
                linkTo(methodOn(LearningPlanController.class).getAllPlans()).withSelfRel());
    }

    // Get a specific plan by ID
    @GetMapping("/{id}")
    public EntityModel<LearningPlan> getPlan(@PathVariable String id) {
        LearningPlan plan = learningPlanService.getPlanById(id)
                .orElseThrow(() -> new RuntimeException("Plan not found"));
        return toModel(plan);
    }

    // Update plan
    @PutMapping("/{id}")
    public EntityModel<LearningPlan> updatePlan(@PathVariable String id, @RequestBody LearningPlan updatedPlan) {
        LearningPlan updated = learningPlanService.updatePlan(id, updatedPlan);
        return toModel(updated);
    }

    // Delete plan
   @DeleteMapping("/{id}")
public EntityModel<Map<String, String>> deletePlan(@PathVariable String id) {
    learningPlanService.deletePlan(id);

    Map<String, String> response = new HashMap<>();
    response.put("message", "Plan deleted");

    return EntityModel.of(response,
            linkTo(methodOn(LearningPlanController.class).getAllPlans()).withRel("all-plans"),
            linkTo(methodOn(LearningPlanController.class).createPlan(null)).withRel("create").withType("POST")
    );
}

    // === Helper: Convert to HATEOAS ===
    private EntityModel<LearningPlan> toModel(LearningPlan plan) {
        return EntityModel.of(plan,
                linkTo(methodOn(LearningPlanController.class).getPlan(plan.getId())).withSelfRel(),
                linkTo(methodOn(LearningPlanController.class).updatePlan(plan.getId(), null)).withRel("update").withType("PUT"),
                linkTo(methodOn(LearningPlanController.class).deletePlan(plan.getId())).withRel("delete").withType("DELETE"),
                linkTo(methodOn(LearningPlanController.class).getAllPlans()).withRel("all-plans"));
    }
}