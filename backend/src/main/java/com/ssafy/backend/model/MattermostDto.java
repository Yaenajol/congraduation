package com.ssafy.backend.model;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

public class MattermostDto {
  @Getter
  public static class Attachments {
    private List<Attachment> attachments;

    public Attachments() {
      attachments = new ArrayList<>();
    }

    public Attachments(List<Attachment> attachments) {
      this.attachments = attachments;
    }

    public Attachments(Attachment attachment) {
      this();
      this.attachments.add(attachment);
    }

  }

  @Getter
  @AllArgsConstructor
  @Builder
  @ToString
  public static class Attachment {
    private String channel;

    private String pretext;

    private String color;

    @SerializedName("author_name")  // Gson 어노테이션 : Gson 의존성주입 필요
    private String authorName;

    @SerializedName("author_icon")
    private String authorIcon;

    private String title;

    private String text;

    private String footer;

    public Attachment addFeedbackInfo(FeedbackDto feedbackDto) {
      this.title = "feedback now : " + feedbackDto.getMessageType().toString();
      StringBuilder sb = new StringBuilder(text);
      sb.append("**Feedback Sender**").append("/n").append("/n").append("```").append(feedbackDto.getSenderPk()).append("```")
          .append("/n").append("/n");

      sb.append("**Feedback Content**").append("/n").append("/n").append("```").append(feedbackDto.getContent()).append("```")
          .append("/n").append("/n");

      this.text = sb.toString();
      return this;
    }


  }

  /** Exception e 를 담고 Stack Trace로 나타내기 위해 만든 코드이므로 우리를 필요없다. **/
//  public static class Props {
//    private String card;
//
//    public Props() {
//      StringBuilder text = new StringBuilder();
//
//      StringWriter sw = new StringWriter();
//
//      text.append("**Stack Trace")
//    }
//  }
}
