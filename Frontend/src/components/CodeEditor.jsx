import { useRef } from "react";
import {
  Box,
  HStack,
  VStack,
  useColorModeValue,
  useColorMode,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = ({
  language,
  setLanguage,
  value,
  setValue,
  hideLanguageSelector,
}) => {
  const editorRef = useRef();
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const bg = useColorModeValue("white", "#0f0a19");
  const editorBorder = useColorModeValue("#89b2db", "#505a80");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box bg={bg} borderRadius="lg" w="100%" h="100%">
      {/* Desktop Layout */}

      {!isMobile ? (
        <HStack spacing={6} h="100%" w="100%">
          {/* LEFT SIDE - CODE EDITOR */}
          <VStack
            w={{ base: "100%", md: "50%" }}
            h="100%"
            spacing={1}
            align="stretch"
          >
            {!hideLanguageSelector && (
              <LanguageSelector language={language} onSelect={onSelect} />
            )}

            <Box
              flex="1"
              border="1.5px solid"
              borderColor={editorBorder}
              borderRadius="lg"
              overflow="hidden"
              bg={useColorModeValue("white", "#181930")}
            >
              <Editor
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  scrollbar: {
                    verticalScrollbarSize: 6,
                    horizontalScrollbarSize: 6,
                    alwaysConsumeMouseWheel: false,
                  },
                }}
                height="100%"
                theme={colorMode === "dark" ? "vs-dark" : "light"}
                language={language}
                value={value}
                onMount={onMount}
                onChange={(value) => setValue(value)}
              />
            </Box>
          </VStack>

          {/* RIGHT SIDE - OUTPUT */}
          <Box w={{ base: "100%", md: "50%" }} h="100%">
            <Output editorRef={editorRef} language={language} />
          </Box>
        </HStack>
      ) : (
        /* Mobile Layout */
        <VStack spacing={4} h="100%">
          <Box
            h="50%"
            w="100%"
            border="1.5px solid"
            borderColor={editorBorder}
            borderRadius="lg"
            overflow="hidden"
            bg={useColorModeValue("white", "#181930")}
          >
            <Editor
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
              height="100%"
              theme={colorMode === "dark" ? "vs-dark" : "light"}
              language={language}
              value={value}
              onMount={onMount}
              onChange={(value) => setValue(value)}
            />
          </Box>

          <Box h="50%" w="100%">
            <Output editorRef={editorRef} language={language} />
          </Box>
        </VStack>
      )}
    </Box>
  );
};

export default CodeEditor;
