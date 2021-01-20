import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Comment } from "src/app/models/Comment";
import { UserReference } from "src/app/models/UserReference";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "Comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"],
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Output() commentAdd = new EventEmitter<string>();
  @Output() commentRemove = new EventEmitter<string>();
  private userReference: UserReference;
  private commentBody: string = "";
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
        this.userReference = user;
      })
  }

  handleCommentAdd() {
    this.commentAdd.emit(this.commentBody);
    this.commentBody = "";
  }
  handleCommentRemove(commentId: string) {
    this.commentRemove.emit(commentId);
  }
}
