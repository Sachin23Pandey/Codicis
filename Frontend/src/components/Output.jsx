import { useState } from "react";
import {
  Box,
  Button,
  Text,
  useToast,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { executeCode } from "../api";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const Output = ({
  editorRef,
  language,
  mobileMode = false,
  goBack,
}) => {
  const toast = useToast();

  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const bg = useColorModeValue("white", "#181930");
  const border = useColorModeValue("#d9e1f2", "#80b29cff");
  const textColor = useColorModeValue("gray.800", "#e4e8ef");

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      setOutput(null);

      const { run: result } = await executeCode(language, sourceCode);

      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      toast({
        title: "Execution error",
        description: error.message,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const previewCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    try {
      setIsPreviewLoading(true);
      setOutput(null);

      const response = await axios.post(
        "http://localhost:3000/ai/get-review",
        { code: sourceCode }
      );

      setOutput(response.data.split("\n"));
      setIsError(false);
    } catch (error) {
      toast({
        title: "Preview error",
        description: error.message,
        status: "error",
      });
    } finally {
      setIsPreviewLoading(false);
    }
  };

  return (
    <VStack w="100%" h="100%" align="stretch" spacing={3}>
      {mobileMode && (
        <Button onClick={goBack} alignSelf="flex-start">
          ← Back
        </Button>
      )}

      <Text fontSize="lg" fontWeight="bold">
        Execution Output
      </Text>

      <HStack spacing={4}>
        <Button
          colorScheme="green"
          isLoading={isLoading}
          onClick={runCode}
        >
          Run Code
        </Button>

        <Button
          colorScheme="blue"
          isLoading={isPreviewLoading}
          onClick={previewCode}
        >
          Preview Code
        </Button>
      </HStack>

      <Box
        flex="1"
        border="1px solid"
        borderRadius="lg"
        borderColor={isError ? "red.400" : border}
        bg={bg}
        overflowY="auto"
      >
        <Box
          p={6}
          color={isError ? "red.400" : textColor}
          sx={{
            "& ul, & ol": {
              paddingLeft: "1.5rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
            "& li": {
              marginBottom: "0.4rem",
            },
            "& p": {
              marginBottom: "0.75rem",
            },
            "& h1, & h2, & h3": {
              marginTop: "1rem",
              marginBottom: "0.5rem",
            },
            "& pre": {
              padding: "1rem",
              borderRadius: "0.5rem",
              overflowX: "auto",
            },
            "& blockquote": {
              borderLeft: "4px solid #4a90e2",
              paddingLeft: "1rem",
              opacity: 0.8,
              marginTop: "0.75rem",
              marginBottom: "0.75rem",
            },
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {output
              ? output.join("\n")
              : "Click Run Code or Preview Code"}
          </ReactMarkdown>
        </Box>
      </Box>
    </VStack>
  );
};

export default Output;