/* eslint-disable react/display-name */
import { Box, BoxProps } from '@chakra-ui/react';
import { memo } from 'react';

interface CardProps extends BoxProps {
    /** Adds a blue border on hover. Use for cards that are links or otherwise interactive. */
    hoverAccent?: boolean;
}

export const Card = memo(({ hoverAccent = false, children, ...rest }: CardProps) => {
    return (
        <Box
            bg="gray.800"
            border="1px solid"
            borderColor="whiteAlpha.200"
            borderRadius="xl"
            transition="all 0.2s ease"
            _hover={hoverAccent ? { borderColor: 'brand.400', transform: 'translateY(-2px)' } : undefined}
            {...rest}
        >
            {children}
        </Box>
    );
});
