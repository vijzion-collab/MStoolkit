/**
 * Enhanced Core logic for Streaming Royalty Calculations.
 * Supports bi-directional (interchangeable) inputs.
 */

export interface RoyaltyState {
    rate: number;
    streams: number;
    totalRevenue: number;
    artistMasterPct: number;
    artistMasterTotal: number;
    producerMasterPct: number;
    producerMasterTotal: number;
    labelMasterPct: number;
    labelMasterTotal: number;
    publishingPct: number;
    publishingTotal: number;
    adminPubPct: number;
    adminPubTotal: number;
    artistPubSharePct: number;
    artistPubTotal: number;
    otherPubTotal: number;
}

/**
 * Calculates a complete state from minimal "anchor" values.
 * Default anchor: rate, streams, and percentages.
 */
export function calculateFullState(current: Partial<RoyaltyState>): RoyaltyState {
    const rate = current.rate ?? 0.004;
    const streams = current.streams ?? 1000000;
    const totalRevenue = current.totalRevenue ?? (rate * streams);

    const artistMasterPct = current.artistMasterPct ?? 16;
    const producerMasterPct = current.producerMasterPct ?? 4;
    const publishingPct = current.publishingPct ?? 12;
    const adminPubPct = current.adminPubPct ?? 15;
    const artistPubSharePct = current.artistPubSharePct ?? 100;

    // Publishing Calculations
    const publishingTotal = totalRevenue * (publishingPct / 100);
    const adminPubTotal = publishingTotal * (adminPubPct / 100);
    const netPublishing = publishingTotal - adminPubTotal;
    const artistPubTotal = netPublishing * (artistPubSharePct / 100);
    const otherPubTotal = netPublishing - artistPubTotal;

    // Master Calculations
    const masterPool = totalRevenue - publishingTotal;
    const labelMasterPct = 100 - artistMasterPct - producerMasterPct;
    const artistMasterTotal = masterPool * (artistMasterPct / 100);
    const producerMasterTotal = masterPool * (producerMasterPct / 100);
    const labelMasterTotal = masterPool * (labelMasterPct / 100);

    return {
        rate,
        streams,
        totalRevenue,
        artistMasterPct,
        artistMasterTotal,
        producerMasterPct,
        producerMasterTotal,
        labelMasterPct,
        labelMasterTotal,
        publishingPct,
        publishingTotal,
        adminPubPct,
        adminPubTotal,
        artistPubSharePct,
        artistPubTotal,
        otherPubTotal,
    };
}

/**
 * Utility to update state when a dollar value changes, re-calculating its percentage.
 */
export function updateByMonetary(state: RoyaltyState, key: keyof RoyaltyState, value: number): RoyaltyState {
    const newState = { ...state, [key]: value };

    if (key === 'totalRevenue') {
        newState.streams = value / state.rate;
    } else if (key === 'artistMasterTotal') {
        const masterPool = state.totalRevenue - state.publishingTotal;
        newState.artistMasterPct = masterPool > 0 ? (value / masterPool) * 100 : 0;
    } else if (key === 'producerMasterTotal') {
        const masterPool = state.totalRevenue - state.publishingTotal;
        newState.producerMasterPct = masterPool > 0 ? (value / masterPool) * 100 : 0;
    }

    return calculateFullState(newState);
}

/**
 * Utility to update state when a percentage changes.
 */
export function updateByPercentage(state: RoyaltyState, key: keyof RoyaltyState, value: number): RoyaltyState {
    return calculateFullState({ ...state, [key]: value });
}
