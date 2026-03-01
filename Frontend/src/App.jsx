import {
  Box,
  Flex,
  Button,
  IconButton,
  useColorMode,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";
import { useState } from "react";
import { CODE_SNIPPETS } from "./constants";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const [language, setLanguage] = useState("python");
  const [value, setValue] = useState(CODE_SNIPPETS["python"]);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
    onClose(); // close drawer after selection
  };

  return (
    <Flex direction="column" height="100vh" overflow="hidden">
      {/* Top Bar */}
      <Flex justify="space-between" align="center" p={4} position="relative">
        {/* LEFT SECTION (Desktop Button OR Mobile Hamburger) */}
        <Flex align="center" gap={3}>
          {/* Hamburger only for mobile */}
          {isMobile && (
            <IconButton
              icon={<HamburgerIcon />}
              variant="outline"
              onClick={onOpen}
            />
          )}

          {/* Modern Button for Desktop */}
          {!isMobile && (
            <Button
              px={6}
              py={2}
              borderRadius="md"
              fontWeight="medium"
              fontSize="sm"
              letterSpacing="0.3px"
              transition="all 0.2s ease"
              border="1px solid"
              bg={colorMode === "dark" ? "#202123" : "#fbf6f6"}
              borderColor={colorMode === "dark" ? "#2f2f2f" : "gray.200"}
              color={colorMode === "dark" ? "gray.200" : "gray.700"}
              _hover={{
                bg: colorMode === "dark" ? "#2a2b32" : "gray.50",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
            >
              ⚡Codicis
            </Button>
          )}
        </Flex>

        {/* CENTER BUTTON (Only for Mobile & Tablet) */}
        {isMobile && (
          <Box position="absolute" left="50%" transform="translateX(-50%)">
            <Button
              px={5}
              py={2}
              borderRadius="md"
              fontSize="sm"
              fontWeight="medium"
              transition="all 0.2s ease"
              border="1px solid"
              bg={colorMode === "dark" ? "#202123" : "#e1eafa"}
              borderColor={colorMode === "dark" ? "#2f2f2f" : "gray.200"}
              color={colorMode === "dark" ? "gray.200" : "gray.700"}
                _hover={{
                transform: "translateY(-2.5px)",
                boxShadow: "lg",
              }}
              _active={{
                transform: "scale(1)",
              }}
            >
              ⚡Codicis
            </Button>
          </Box>
        )}

        {/* Dark / Light toggle stays right */}
        <IconButton
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          variant="outline"
        />
      </Flex>

      {/* Main Section */}
      <Flex flex="1" px={6} pb={4} overflow="hidden">
        <CodeEditor
          language={language}
          setLanguage={setLanguage}
          value={value}
          setValue={setValue}
          hideLanguageSelector={isMobile}
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Select Language</DrawerHeader>

          <DrawerBody>
            <LanguageSelector
              language={language}
              onSelect={handleLanguageSelect}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default App;
