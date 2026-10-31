import type { ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { MermaidDiagram } from "@/components/MermaidDiagram";

type Props = { content: string; className?: string };

export function MarkdownContent({ content, className = "article-content" }: Props) {
  return (
    <div className={className}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={{
        pre({ children }) {
          const codeEl = children as ReactElement<{ children?: string; className?: string }>;
          const codeText =
            typeof codeEl?.props?.children === "string"
              ? codeEl.props.children
              : "";
          const lang = codeEl?.props?.className?.replace("language-", "") ?? "";
          if (lang === "mermaid") {
            return <MermaidDiagram chart={codeText} />;
          }
          return (
            <div className="code-block">
              <CopyCodeButton code={codeText} />
              <pre>{children}</pre>
            </div>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  );
}
