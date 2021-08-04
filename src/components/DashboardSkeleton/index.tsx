import React from 'react';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { HeaderContainer, HeaderTitle, ProviderListContainer } from './styles';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const DashboardSkeleton = (): JSX.Element => (
  <>
    <HeaderContainer>
      <HeaderTitle>
        <ShimmerPlaceholder
          width={120}
          height={24}
          style={{ marginBottom: 8 }}
        />
        <ShimmerPlaceholder width={48} height={24} />
      </HeaderTitle>
      <ShimmerPlaceholder style={{ borderRadius: 32 }} width={64} height={64} />
    </HeaderContainer>
    <ProviderListContainer>
      <ShimmerPlaceholder
        width={180}
        height={48}
        style={{ marginVertical: 16 }}
      />
      {Array.from(Array(10), (_, index) => (
        <ShimmerPlaceholder
          key={index.toString()}
          style={{ width: '100%', marginBottom: 12, borderRadius: 8 }}
          height={80}
        />
      ))}
    </ProviderListContainer>
  </>
);
