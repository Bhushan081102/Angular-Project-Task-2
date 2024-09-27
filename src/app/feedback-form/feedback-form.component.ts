import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Feedback {
  name: string;
  batch: number;
  feedbackText: string;
}

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent {
  feedbackForm: FormGroup;
  feedbackList: Feedback[] = [];
  isEditing: boolean = false; // Track if we are editing
  editIndex: number | null = null; // Track the index of the feedback being edited

  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      batch: ['', [Validators.required, Validators.min(1)]],
      feedbackText: ['', Validators.required]
    });
  }

  submitFeedback() {
    if (this.feedbackForm.valid) {
      const feedback: Feedback = {
        name: this.feedbackForm.value.name,
        batch: this.feedbackForm.value.batch,
        feedbackText: this.feedbackForm.value.feedbackText
      };

      if (this.isEditing && this.editIndex !== null) {
        // Update existing feedback
        this.feedbackList[this.editIndex] = feedback;
      } else {
        // Add new feedback
        this.feedbackList.push(feedback);
      }

      this.clearForm(); // Reset the form after submission
    }
  }

  editFeedback(index: number) {
    const feedbackToEdit = this.feedbackList[index];
    this.feedbackForm.patchValue({
      name: feedbackToEdit.name,
      batch: feedbackToEdit.batch,
      feedbackText: feedbackToEdit.feedbackText
    });
    this.isEditing = true; // Set editing state to true
    this.editIndex = index; // Set the index of the feedback being edited
  }

  clearForm() {
    this.feedbackForm.reset(); // Clear all form fields
    this.isEditing = false; // Reset editing state
    this.editIndex = null; // Reset edit index
  }

  deleteFeedback(index: number) {
    this.feedbackList.splice(index, 1); // Remove feedback at the specified index
  }
}
