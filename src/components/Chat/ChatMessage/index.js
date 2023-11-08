import React from "react";

import { Typography } from '@material-ui/core'

import moment from "moment";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { MemoizedReactMarkdown } from '../memoized-react-markdown';
import { CodeBlock } from "../code-block";

import { useStyles } from './styles';

export const ChatMessage = ({ chat, index }) => {
  const classes = useStyles();

  return (
    <div className={classes[`dialog${chat.role}`]} key={`chat-message-agent${index}`}>
      <div className={classes[`chatBalloon${chat.role}`]}>
        <div className={classes[`chatBalloonText${chat.role}`]}>
          {/* {chat.type === 'message' && chat.content}
          {chat.type === 'picture' && <img src={chat.content} alt="Send By Agent" className={classes.chatImage} />}
          {chat.type === 'file' &&
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GetAppIcon fontSize="large" />
              <a href="../../assets/images/peru.png" download>
                {chat.content}
              </a>
            </div>
          } */}
          <MemoizedReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              p({ children }) {
                return <span className="mb-2 last:mb-0">{children}</span>;
              },
              code({ node, inline, className, children, ...props }) {
                if (children.length) {
                  if (children[0] === "▍") {
                    return (
                      <span className="mt-1 animate-pulse cursor-default">
                        ▍
                      </span>
                    );
                  }

                  children[0] = (children[0]).replace("`▍`", "▍");
                }

                const match = /language-(\w+)/.exec(className || "");

                if (inline) {
                  return (
                    <code style={{whiteSpace: 'pre-wrap'}} >
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ""}
                    value={String(children).replace(/\n$/, "")}
                  />
                );
              },
            }}
          >
            {chat.content.replace(/\\n/g, "  \n")}
          </MemoizedReactMarkdown>
        </div>
        <Typography variant='body2' className={classes.chatBalloonTime}>
          {moment(chat.createdAt).format("YYYY-MM-DD HH:mm")}
        </Typography>
      </div>
    </div>
  )
}