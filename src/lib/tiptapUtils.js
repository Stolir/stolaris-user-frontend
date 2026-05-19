import { generateHTML } from "@tiptap/html";
import { StarterKit } from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import DOMPurify from "dompurify";

const lowlight = createLowlight(all);

const extensions = [
  StarterKit.configure({
    codeBlock: false,
  }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TaskList,
  CodeBlockLowlight.configure({ lowlight, defaultLanguage: null }),
  TaskItem.configure({ nested: true }),
  Highlight.configure({ multicolor: true }),
  Typography,
  Superscript,
  Subscript,
];

export function createArticleHTML(content) {
  const html = generateHTML({ type: "doc", content }, extensions);
  const cleanHtml = DOMPurify.sanitize(html);
  return { __html: cleanHtml };
}
