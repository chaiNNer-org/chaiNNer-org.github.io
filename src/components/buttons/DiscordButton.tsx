/* eslint-disable react/display-name */
import { Button, Link, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { SiDiscord } from 'react-icons/si/index.js';
import { discordLink } from '../../utils/links';

export const DiscordButton = memo(() => {
    return (
        <Button
            className="external-link-button"
            bg="gray.800"
            color="white"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.2)"
            leftIcon={<SiDiscord />}
            as={Link}
            href={discordLink}
            borderRadius="lg"
            px={6}
            py={3}
            fontWeight="500"
            transition="all 0.2s ease"
            _hover={{
                bg: 'rgba(139, 92, 246, 0.1)',
                borderColor: 'purple.400',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            }}
            _active={{
                transform: 'translateY(0)',
            }}
        >
            <Text>Discord</Text>
        </Button>
    );
});
