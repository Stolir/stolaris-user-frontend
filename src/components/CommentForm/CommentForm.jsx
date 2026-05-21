import styles from "./CommentForm.module.css";
import {
  MDXEditor,
  quotePlugin,
  codeBlockPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  spellCheck$,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";
import { useRef } from "react";
import CustomButton from "../CustomButton/CustomButton";

function CommentForm({ onPostComment }) {
  const editorRef = useRef(null);

  async function handlePost() {
    const content = editorRef?.current.getMarkdown();
    const posted = await onPostComment(content);
    if (posted) {
      editorRef?.current.setMarkdown("");
    }
  }

  return (
    <form className={styles.commentForm}>
      <MDXEditor
        markdown=""
        ref={editorRef}
        contentEditableClassName={styles.commentContentEditable}
        trim={false}
        placeholder="Share your thoughts!"
        plugins={[
          quotePlugin(),
          codeBlockPlugin(),
          listsPlugin(),
          markdownShortcutPlugin(),
        ]}
      />
      <CustomButton text={"publish"} onClick={handlePost} />
    </form>
  );
}

export default CommentForm;
