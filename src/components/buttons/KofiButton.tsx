/* eslint-disable react/display-name */
import { Button, Link, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { SiKofi } from 'react-icons/si/index.js';

export const KofiButton = memo(() => {
    return (
        <Button
            className="external-link-button"
            bg="gray.800"
            color="white"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.2)"
            leftIcon={<SiKofi />}
            as={Link}
            href="https://ko-fi.com/T6T46KTTW"
            borderRadius="lg"
            px={6}
            py={3}
            fontWeight="500"
            transition="all 0.2s ease"
            _hover={{
                bg: 'rgba(236, 72, 153, 0.1)',
                borderColor: 'pink.400',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
            }}
            _active={{
                transform: 'translateY(0)',
            }}
        >
            <Text>Ko-fi</Text>
        </Button>
    );
});
