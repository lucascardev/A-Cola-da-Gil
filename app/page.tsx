import { getDefaultCampaign } from '@/lib/campaigns';
import { ColaPageView } from '@/components/cola-page-view';

export default function HomePage() {
  const gilCampaign = getDefaultCampaign();
  return <ColaPageView campaign={gilCampaign} />;
}
