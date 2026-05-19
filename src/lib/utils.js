import { createArticleHTML } from "./tiptapUtils";

export function formatDateUTC(iso) {
  return iso.split("T")[0];
}

export function formatDateLocal(iso) {
  const date = new Date(iso);

  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}

export function getDateString(date) {
  return new Date(date).toDateString().slice(4);
}

export function getArticleDescription(article) {
  const content = article.content.content;
  // Find first paragraph and use it for the description
  const firstPara = content.find((item) => item.type === "paragraph").content;
  const desc = createArticleHTML(firstPara);

  return desc;
}
