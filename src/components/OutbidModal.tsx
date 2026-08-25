import React, { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import type { Category } from '../types';
import { parseProductUrl } from '../utils/productHelper';
import { 
  X, 
  Globe, 
  CheckCircle2,
  Lock,
  Upload,
  Sparkles
} from 'lucide-react';

export const OutbidModal: React.FC = () => {
  const { 
    selectedProductForOutbid, 
    closeSubmitModal, 
    submitCampaign 
  } = useProduct();

  const [productUrl, setProductUrl] = useState('');
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [creatorHandle, setCreatorHandle] = useState('');
  const [category, setCategory] = useState<Category>('ugc');
  const [mediaData, setMediaData] = useState<string | undefined>(undefined);
  const [mediaType, setMediaType] = useState<'url' | 'image' | 'video'>('url');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (selectedProductForOutbid) {
      setProductUrl(selectedProductForOutbid.url || '');
      setName(selectedProductForOutbid.name || '');
      setTagline(selectedProductForOutbid.tagline || '');
      setDescription(selectedProductForOutbid.description || '');
      setCreatorName(selectedProductForOutbid.creator?.name || '');
      setCreatorHandle(selectedProductForOutbid.creator?.handle || '');
      setCategory(selectedProductForOutbid.category || 'ugc');
      setMediaData(selectedProductForOutbid.mediaData);
      setMediaType(selectedProductForOutbid.mediaType || 'url');
    }
  }, [selectedProductForOutbid]);

  const parsed = parseProductUrl(productUrl);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video');
    const reader = new FileReader();
    reader.onload = (event) => {
      setMediaData(event.target?.result as string);
      setMediaType(isVideo ? 'video' : 'image');
      if (!name) setName(file.name.replace(/\.[^/.]+$/, ''));
      if (!productUrl) setProductUrl(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productUrl) return;

    setIsProcessing(true);
    setTimeout(() => {
      submitCampaign({
        productUrl,
        name: name || parsed.name,
        tagline: tagline || 'Marketing Creative / Campaign',
        description: description || 'Listed on the marketingdb.lol leaderboard',
        creatorName: creatorName || parsed.name,
        creatorHandle: creatorHandle || `@${parsed.displayUrl.split('.')[0]}`,
        category,
        mediaType,
        mediaData,
        targetProductId: selectedProductForOutbid?.id
      });
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="modal-overlay" onClick={closeSubmitModal}>
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '1.75rem' }}
      >
        {/* Close button */}
        <button
          onClick={closeSubmitModal}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-input)',
            border: 'none',
            color: 'var(--text-primary)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Sparkles size={20} color="var(--accent-primary)" />
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: 800
            }}>
              Submit Campaign — Free
            </h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            100% free. Stay on the board forever. Ranking moves up with community Push Ups.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Campaign URL or Upload */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Campaign URL or Creative File *
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.55rem 0.75rem',
              gap: '0.5rem'
            }}>
              <Globe size={16} color="var(--accent-primary)" />
              <input
                type="text"
                required
                placeholder="https://campaign.com or creative file"
                value={productUrl}
                onChange={(e) => {
                  setProductUrl(e.target.value);
                  if (!name && e.target.value.length > 3) {
                    const p = parseProductUrl(e.target.value);
                    setName(p.name);
                  }
                }}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />

              <label style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.75rem',
                color: 'var(--accent-primary)',
                background: 'rgba(201, 142, 214, 0.15)',
                padding: '0.25rem 0.55rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600
              }}>
                <Upload size={13} />
                <span>Upload</span>
                <input type="file" onChange={handleFileUpload} accept="image/*,video/*" style={{ display: 'none' }} />
              </label>
            </div>

            {mediaData && (
              <div style={{
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem',
                background: 'rgba(16, 185, 129, 0.08)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                fontSize: '0.75rem',
                color: 'var(--accent-green)'
              }}>
                <CheckCircle2 size={13} />
                <span>Creative attached successfully</span>
              </div>
            )}
          </div>

          {/* Campaign Name & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Campaign / Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Launch Campaign"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.55rem 0.75rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.55rem 0.75rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="ugc">UGC</option>
                <option value="meta-ads">Meta Ads</option>
                <option value="tiktok">TikTok</option>
                <option value="twitter-x">Tweet / X</option>
                <option value="youtube">YouTube</option>
                <option value="landing-pages">Landing Pages</option>
                <option value="email">Email</option>
                <option value="copywriting">Copywriting</option>
                <option value="branding">Branding</option>
                <option value="creative">Creative</option>
                <option value="organic">Organic</option>
              </select>
            </div>
          </div>

          {/* Headline / Tagline */}
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Headline / Value Prop
            </label>
            <input
              type="text"
              placeholder="e.g. Viral X thread breakdown on customer acquisition"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '0.55rem 0.75rem',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Pricing Confirmation Box ($5 Flat Lifetime) */}
          <div style={{
            background: 'rgba(201, 142, 214, 0.08)',
            border: '1px solid rgba(201, 142, 214, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--accent-primary)' }}>
                ✦ Free Listing
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                No payment • Permanent listing
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 900,
              color: 'var(--accent-primary)'
            }}>
              $0
            </div>
          </div>

          {/* Submit action */}
          <button
            type="submit"
            disabled={isProcessing}
            className="btn btn-primary"
            style={{
              padding: '0.8rem',
              fontSize: '0.95rem',
              fontWeight: 800,
              gap: '0.5rem',
              width: '100%'
            }}
          >
            {isProcessing ? (
              <span>Confirming Entry...</span>
            ) : (
              <span>Complete Entry for $5</span>
            )}
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            <Lock size={12} />
            <span>Instant Listing on marketingdb.lol</span>
          </div>
        </form>
      </div>
    </div>
  );
};
