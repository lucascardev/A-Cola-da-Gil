import type { Metadata } from 'next';
import { getCampaignBySlug, getAllCampaignSlugs } from '@/lib/campaigns';
import { ColaPageView } from '@/components/cola-page-view';

interface CampaignPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCampaignSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);

  return {
    title: `${campaign.title} - ${campaign.slogan}`,
    description: `${campaign.description} Números para consulta e impressão na urna eletrônica.`,
    openGraph: {
      title: `${campaign.title} - ${campaign.slogan}`,
      description: campaign.description,
      type: 'website',
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${campaign.title} - ${campaign.slogan}`,
      description: campaign.description,
    },
  };
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);

  return <ColaPageView campaign={campaign} />;
}
