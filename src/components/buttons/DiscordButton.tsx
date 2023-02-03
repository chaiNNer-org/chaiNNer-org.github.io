/* eslint-disable react/display-name */
import { Button, Link, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { SiDiscord } from 'react-icons/si/index.js';
import { discordLink } from '../../utils/links';

export const DiscordButton = memo(() => {
    return (
        <Button
            className="external-link-button"
            colorScheme="purple"
            leftIcon={<SiDiscord />}
            as={Link}
            href={discordLink}
        >
            <Text> Discord</Text>
        </Button>
    );
});
