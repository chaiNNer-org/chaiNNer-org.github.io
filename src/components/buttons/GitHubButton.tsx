/* eslint-disable react/display-name */
import { Button, Link, HStack, Text, Tag, Icon } from '@chakra-ui/react';
import { memo } from 'react';
import { BsFillStarFill, BsGithub } from 'react-icons/bs/index.js';
import { githubLink } from '../../utils/links';

export const GitHubButton = memo(({ stars }: { stars?: number }) => {
    return (
        <Button
            className="external-link-button"
            bg="gray.800"
            color="white"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.2)"
            leftIcon={<BsGithub />}
            as={Link}
            href={githubLink}
            borderRadius="lg"
            px={6}
            py={3}
            fontWeight="500"
            transition="all 0.2s ease"
            _hover={{
                bg: 'rgba(59, 130, 246, 0.1)',
                borderColor: 'brand.400',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            }}
            _active={{
                transform: 'translateY(0)',
            }}
        >
            <HStack spacing={2}>
                <Text>GitHub</Text>
                {stars !== undefined && (
                    <Tag
                        bg="rgba(59, 130, 246, 0.2)"
                        color="brand.300"
                        border="1px solid"
                        borderColor="brand.400"
                        borderRadius="md"
                    >
                        <HStack spacing={1}>
                            <Icon
                                as={BsFillStarFill}
                                boxSize={3}
                            />
                            <Text
                                fontSize="sm"
                                fontWeight="600"
                            >
                                {new Intl.NumberFormat('en', { notation: 'compact' }).format(stars)}
                            </Text>
                        </HStack>
                    </Tag>
                )}
            </HStack>
        </Button>
    );
});
