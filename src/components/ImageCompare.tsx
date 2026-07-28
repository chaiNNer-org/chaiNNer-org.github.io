/* eslint-disable react/display-name */
import { Box, Image, Text } from '@chakra-ui/react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

export interface ImageCompareProps {
    before: string;
    after: string;
    beforeLabel: string;
    afterLabel: string;
    /** Intrinsic size of the pair, used to reserve space so nothing shifts on load. */
    width: number;
    height: number;
    /** Describes what the pair shows, for anyone who cannot see it. */
    alt: string;
}

const clamp = (value: number): number => Math.min(100, Math.max(0, value));

function Label({ children, side }: { children: React.ReactNode; side: 'left' | 'right' }): JSX.Element {
    return (
        <Text
            position="absolute"
            top={3}
            left={side === 'left' ? 3 : undefined}
            right={side === 'right' ? 3 : undefined}
            px={2}
            py={1}
            borderRadius="md"
            bg="rgba(15, 19, 28, 0.82)"
            fontFamily="mono"
            fontSize="xs"
            color="inkMuted"
            pointerEvents="none"
        >
            {children}
        </Text>
    );
}

/**
 * A before/after wipe. Replaces the imgsli embed the v0.16.0 post used to
 * point at, which went offline and took the comparison with it.
 *
 * The handle is a real range input, so it is draggable with a mouse, focusable,
 * and adjustable with arrow keys without any extra key handling. Without
 * JavaScript, or before hydration, the "after" image is simply shown whole.
 */
export const ImageCompare = memo(({ before, after, beforeLabel, afterLabel, width, height, alt }: ImageCompareProps) => {
    const [position, setPosition] = useState(50);
    const [interactive, setInteractive] = useState(false);
    const frame = useRef<HTMLDivElement>(null);

    // Only take over once mounted, so the static page still shows a full image.
    useEffect(() => {
        setInteractive(true);
    }, []);

    const dragTo = useCallback((clientX: number) => {
        const box = frame.current?.getBoundingClientRect();
        if (box === undefined || box.width === 0) return;
        setPosition(clamp(((clientX - box.left) / box.width) * 100));
    }, []);

    return (
        <Box
            as="figure"
            m={0}
            my={8}
        >
            <Box
                ref={frame}
                position="relative"
                w="100%"
                sx={{ aspectRatio: `${width} / ${height}` }}
                borderRadius="lg"
                border="1px solid"
                borderColor="line"
                overflow="hidden"
                bg="canvas"
                onPointerDown={(event) => {
                    if (!interactive) return;
                    event.currentTarget.setPointerCapture(event.pointerId);
                    dragTo(event.clientX);
                }}
                onPointerMove={(event) => {
                    if (!interactive || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
                    dragTo(event.clientX);
                }}
            >
                <Image
                    src={after}
                    alt={alt}
                    loading="lazy"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    draggable={false}
                />

                {interactive && (
                    <>
                        {/* The "before" state, revealed to the left of the handle. */}
                        <Box
                            position="absolute"
                            inset={0}
                            overflow="hidden"
                            sx={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                        >
                            <Image
                                src={before}
                                alt=""
                                loading="lazy"
                                w="100%"
                                h="100%"
                                objectFit="cover"
                                draggable={false}
                            />
                        </Box>

                        <Box
                            position="absolute"
                            top={0}
                            bottom={0}
                            left={`${position}%`}
                            w="2px"
                            ml="-1px"
                            bg="whiteAlpha.800"
                            pointerEvents="none"
                        />

                        <Label side="left">{beforeLabel}</Label>
                        <Label side="right">{afterLabel}</Label>

                        {/*
                         * The control itself. Transparent and stretched over the
                         * frame: the visuals above are the thumb you see, and this
                         * carries the semantics, focus, and keyboard handling.
                         */}
                        <Box
                            as="input"
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            value={position}
                            aria-label={`Reveal ${beforeLabel} or ${afterLabel}`}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPosition(Number(event.target.value));
                            }}
                            position="absolute"
                            inset={0}
                            w="100%"
                            h="100%"
                            m={0}
                            opacity={0}
                            cursor="ew-resize"
                            sx={{ appearance: 'none', background: 'transparent' }}
                        />
                    </>
                )}
            </Box>

            <Text
                as="figcaption"
                mt={3}
                fontSize="sm"
                color="inkFaint"
                lineHeight="1.6"
            >
                {alt}
            </Text>
        </Box>
    );
});
