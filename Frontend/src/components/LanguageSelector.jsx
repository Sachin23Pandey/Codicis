

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const menuBg = useColorModeValue("white", "#1e1e2f");
  const hoverBg = useColorModeValue("blue.50", "#2a2a40");
  const activeColor = useColorModeValue("blue.600", "blue.300");
  const border = useColorModeValue("gray.200", "gray.600");

  return (
    <Box mb={4}>
      <Text
        mb={2}
        fontSize="lg"
        fontWeight="semibold"
        letterSpacing="0.5px"
      >
        🚀 Select Language
      </Text>

      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          border="1px solid"
          borderColor={border}
          bg={menuBg}
          _hover={{ bg: hoverBg }}
          _expanded={{ bg: hoverBg }}
          width="200px"
        >
          {language.toUpperCase()}
        </MenuButton>

        <MenuList
          bg={menuBg}
          border="1px solid"
          borderColor={border}
          borderRadius="lg"
          boxShadow="lg"
        >
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              _hover={{ bg: hoverBg }}
              onClick={() => onSelect(lang)}
              fontWeight={lang === language ? "bold" : "normal"}
              color={lang === language ? activeColor : "inherit"}
            >
              {lang.toUpperCase()}
              <Text ml={2} fontSize="sm" opacity={0.6}>
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;