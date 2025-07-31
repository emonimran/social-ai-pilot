'use client';

import React, { useState } from 'react';
import { generateContent, generateContentVariations } from '@/lib/ai';
import { ImageSelector } from '@/components/ImageSelector';
import { Button } from '@/components/ui/Button';
import { Sparkles, Copy, RefreshCw, Calendar, Image as ImageIcon } from 'lucide-react';

interface ContentGenerationForm {
  topic: string;
  platform: 'instagram' | 'linkedin' | 'twitter' | 'facebook';
  tone: 'professional' | 'casual' | 'friendly' | 'engaging' | 'informative';
  includeHashtags: boolean;
  brandVoice: string;
}

export const ContentGenerator: React.FC = () => {
  const [form, setForm] = useState<ContentGenerationForm>({
    topic: '',
    platform: 'instagram',
    tone: 'engaging',
    includeHashtags: true,
    brandVoice: ''
  });
  
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageSelector, setShowImageSelector] = useState(false);

  const handleGenerate = async () => {
    if (!form.topic.trim()) return;
    
    setLoading(true);
    try {
      const content = await generateContent(form);
      setGeneratedContent(content);
      setVariations([]);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVariations = async () => {
    if (!generatedContent) return;
    
    setLoading(true);
    try {
      const newVariations = await generateContentVariations(form, 2);
      setVariations(newVariations);
    } catch (error) {
      console.error('Error generating variations:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-8 w-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI Content Generator</h2>
        </div>

        {/* Generation Form */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic or Theme
              </label>
              <input
                type="text"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                placeholder="e.g., 'Digital Marketing Tips' or 'Behind the scenes'"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                value={form.platform}
                onChange={(e) => setForm({ ...form, platform: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="facebook">Facebook</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tone
              </label>
              <select
                value={form.tone}
                onChange={(e) => setForm({ ...form, tone: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="engaging">Engaging</option>
                <option value="informative">Informative</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Voice (Optional)
              </label>
              <textarea
                value={form.brandVoice}
                onChange={(e) => setForm({ ...form, brandVoice: e.target.value })}
                placeholder="Describe your brand's unique voice and style..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includeHashtags"
                checked={form.includeHashtags}
                onChange={(e) => setForm({ ...form, includeHashtags: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeHashtags" className="text-sm text-gray-700">
                Include relevant hashtags
              </label>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !form.topic.trim()}
              className="w-full"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Generated Content */}
        {generatedContent && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Content</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-gray-600 capitalize">
                  {form.platform} Post
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generatedContent.caption)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
              <p className="text-gray-900 whitespace-pre-wrap mb-3">
                {generatedContent.caption}
              </p>
              
              {generatedContent.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {generatedContent.hashtags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateVariations}
                  disabled={loading}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Generate Variations
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowImageSelector(!showImageSelector)}
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  {selectedImage ? 'Change Image' : 'Add Image'}
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule Post
                </Button>
              </div>
            </div>

            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Image</h4>
                <div className="relative inline-block">
                  <img 
                    src={selectedImage} 
                    alt="Selected for post" 
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* Image Selector */}
            {showImageSelector && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Choose an Image</h4>
                <ImageSelector 
                  searchQuery={form.topic}
                  onImageSelect={(imageUrl) => {
                    setSelectedImage(imageUrl);
                    setShowImageSelector(false);
                  }}
                />
              </div>
            )}

            {/* AI Suggestions */}
            {generatedContent.suggestions.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">💡 AI Suggestions</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  {generatedContent.suggestions.map((suggestion: string, index: number) => (
                    <li key={index}>• {suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Content Variations */}
        {variations.length > 0 && (
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alternative Variations</h3>
            <div className="grid gap-4">
              {variations.map((variation, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      Variation {index + 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(variation.caption)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-gray-900 whitespace-pre-wrap mb-3">
                    {variation.caption}
                  </p>
                  {variation.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {variation.hashtags.map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};