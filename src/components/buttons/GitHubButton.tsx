/* eslint-disable react/display-name */
import { Button, Link, HStack, Text, Tag, Icon } from '@chakra-ui/react';
import { memo } from 'react';
import { BsFillStarFill, BsGithub } from 'react-icons/bs/index.js';
import { githubLink } from '../../utils/links';

export const GitHubButton = memo(({ stars }: { stars?: number }) => {
    return (
        <Button
            colorScheme="blue"
            leftIcon={<BsGithub />}
            as={Link}
            href={githubLink}
        >
            <HStack spacing={2}>
                <Text>GitHub</Text>
                {stars !== undefined && (
                    <Tag colorScheme="gray">
                        <HStack spacing={1}>
                            <Icon as={BsFillStarFill}></Icon>
                            <Text>{new Intl.NumberFormat('en', { notation: 'compact' }).format(stars)}</Text>
                        </HStack>
                    </Tag>
                )}
            </HStack>
        </Button>
    );
});
