import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { RecommendMoviesRequest } from "src/app/models/RecommendRequest";
import { AuthService } from "src/app/services/auth.service";
import { RecommendService } from "src/app/services/recommend.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private recommendationService: RecommendService
  ) {}
  private isDistanceDisabled = false;
  private hideNotyfication = false;
  private isNotyficationVisible = false;
  isLoading: boolean = false;
  ngOnInit() {
    this.onChanges();
    setTimeout(() => {
      this.isNotyficationVisible = true;
    },500)
  }

  recForm = this.fb.group({
    algorithm: ["", Validators.required],
    distance: new FormControl(
      { value: "", disabled: this.isDistanceDisabled },
      [Validators.required]
    ),
    divideByFirst: [false],
    divideBySecond: [false],
    divideByThird: [false],
    groupNumber: [3],
    normalizeData: [false],
  });

  onChanges() {
    this.recForm.get("algorithm").valueChanges.subscribe((algorithm) => {
      if (algorithm !== "kmeans" && algorithm !== "Ward") {
        this.recForm.get("distance").enable();
      } else {
        this.recForm.get("distance").setValue("euclidean");
        this.recForm.get("distance").disable();
      }
    });
  }

  onSubmit() {
    const userId = this.authService.getUserData().id;
    const request: RecommendMoviesRequest = {
      userId,
      ...this.recForm.value,
      distance: this.recForm.get("distance").value,
    };
    this.isLoading = true;
    this.recommendationService.recommend(request).subscribe(
      () => {
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  hideNotyficationFn(event: MouseEvent) {
    this.hideNotyfication = true;
    setTimeout(() => {
      this.isNotyficationVisible = false;
    }, 500);
  }
}
