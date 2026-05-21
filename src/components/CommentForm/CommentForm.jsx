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
      <CustomButton text={"publish"} onClick={onPostComment} />
    </form>
  );
}

export default CommentForm;
