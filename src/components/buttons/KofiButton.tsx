/* eslint-disable react/display-name */
import { Button, Link, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { SiKofi } from 'react-icons/si/index.js';

export const KofiButton = memo(() => {
    return (
        <Button
            className="external-link-button"
            colorScheme="pink"
            leftIcon={<SiKofi />}
            as={Link}
            href="https://ko-fi.com/T6T46KTTW"
        >
            <Text>Ko-fi</Text>
        </Button>
    );
});
