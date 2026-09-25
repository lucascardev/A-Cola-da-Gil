import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getCampaignBySlug,
  getAllCampaigns,
  getAllCampaignSlugs,
} from '@/lib/campaigns';
import { ColaPageView } from '@/components/cola-page-view';
import { AlertCircle, ArrowLeft, Heart, ChevronRight } from 'lucide-react';

interface CampaignPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCampaignSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);

  if (!campaign) {
    return {
      title: 'Colinha não encontrada - Eleições 2026',
      description: 'A página de colinha eleitoral procurada não foi encontrada.',
    };
  }

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

  if (!campaign) {
    const allCampaigns = getAllCampaigns();

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 text-center space-y-5">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <AlertCircle className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-black text-slate-900">
              Colinha não encontrada
            </h1>
            <p className="text-sm text-slate-600">
              Não encontramos nenhuma colinha configurada com a rota{' '}
              <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded-md text-pink-600">
                /{slug}
              </code>
              .
            </p>
          </div>

          <div className="space-y-2 text-left pt-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Colinhas disponíveis no sistema:
            </span>

            <div className="space-y-2">
              {allCampaigns.map((c) => (
                <Link
                  key={c.slug}
                  href={c.slug === 'coladagil' ? '/' : `/${c.slug}`}
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl text-white flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: c.colors.primary }}
                    >
                      <Heart className="w-4 h-4 fill-white" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900 group-hover:text-slate-700">
                        {c.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {c.slogan}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para A Cola da Gil</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ColaPageView campaign={campaign} />;
}
