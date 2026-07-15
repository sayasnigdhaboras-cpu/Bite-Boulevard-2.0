import { ArrowLeft, BookOpen, Clock, Calendar, User, Share2 } from 'lucide-react';
import { JournalArticle } from '../types';
import { journalArticles } from '../data';

interface JournalScreenProps {
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
}

export default function JournalScreen({ selectedArticleId, setSelectedArticleId }: JournalScreenProps) {
  const selectedArticle = journalArticles.find(a => a.id === selectedArticleId);

  const handleShare = (articleTitle: string) => {
    if (navigator.share) {
      navigator.share({
        title: articleTitle,
        text: `Check out this editorial article from Bite Boulevard.`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Link copied: Read "${articleTitle}" at Bite Boulevard!`);
    }
  };

  if (selectedArticle) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-300" id="article-detail-view">
        {/* Back Link */}
        <button 
          onClick={() => setSelectedArticleId(null)}
          className="text-on-surface-variant hover:text-primary font-sans text-xs font-semibold tracking-wider uppercase mb-8 flex items-center gap-1.5 transition-colors cursor-pointer"
          id="btn-back-to-journal"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </button>

        {/* Article Metadata */}
        <div className="space-y-4 mb-8">
          <span className="text-secondary font-sans text-[10px] font-bold tracking-[0.25em] uppercase block">
            {selectedArticle.category}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-on-surface leading-tight tracking-tight">
            {selectedArticle.title}
          </h1>
          <p className="font-sans text-sm md:text-base text-on-surface-variant italic leading-relaxed">
            {selectedArticle.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-b border-white/5 py-4 text-xs font-sans text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary" />
              <span>By <strong className="text-on-surface font-medium">{selectedArticle.author}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{selectedArticle.publishDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{selectedArticle.readTime}</span>
            </div>
            <button 
              onClick={() => handleShare(selectedArticle.title)}
              className="ml-auto text-primary hover:opacity-80 transition-opacity flex items-center gap-1 cursor-pointer"
              id="share-article-btn"
            >
              <Share2 className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider text-[10px]">Share Story</span>
            </button>
          </div>
        </div>

        {/* Large Image Hero */}
        <div className="w-full h-[300px] md:h-[450px] rounded-xl overflow-hidden mb-12 border border-white/5 relative">
          <img 
            src={selectedArticle.imageUrl} 
            alt={selectedArticle.title}
            className="w-full h-full object-cover"
            id="article-detail-img"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>

        {/* Rich Body Content */}
        <article className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed space-y-6">
          {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="first-letter:font-serif first-letter:text-3xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:leading-none">
              {paragraph}
            </p>
          ))}
        </article>

        <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-serif text-sm font-bold">
              {selectedArticle.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h5 className="font-sans text-xs font-semibold text-on-surface">{selectedArticle.author}</h5>
              <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-wider">Editorial Contributor</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setSelectedArticleId(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-white/5 px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer"
            id="footer-back-to-journal"
          >
            All Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1120px] mx-auto px-6 md:px-16 py-16 md:py-24 animate-in fade-in duration-300" id="journal-list-view">
      <div className="text-center mb-16 space-y-3">
        <span className="font-sans text-[10px] text-primary tracking-[0.25em] font-bold block uppercase">
          LATEST FROM THE JOURNAL
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-on-surface italic">Bite Journal</h2>
        <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-md mx-auto">
          Insights into rare ingredients, dry-aging microclimates, wine pairings, and the sensory design of Bite Boulevard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {journalArticles.map((article) => (
          <div 
            key={article.id}
            onClick={() => {
              setSelectedArticleId(article.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col group cursor-pointer"
            id={`journal-article-card-${article.id}`}
          >
            <div className="h-64 mb-6 overflow-hidden rounded-lg bg-surface-container border border-white/5 relative">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-[9px] font-bold tracking-widest px-2 py-1 rounded text-primary-fixed uppercase">
                {article.readTime}
              </div>
            </div>
            <span className="font-sans text-[10px] text-secondary font-bold tracking-wider mb-2 uppercase">
              {article.category}
            </span>
            <h4 className="font-serif text-xl text-on-surface mb-3 group-hover:text-primary transition-colors leading-snug">
              {article.title}
            </h4>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant line-clamp-3 mb-4 leading-relaxed">
              {article.description}
            </p>
            <span className="text-xs text-primary font-bold uppercase tracking-wider group-hover:underline flex items-center gap-1 mt-auto">
              <span>Read Article</span>
              <BookOpen className="w-3.5 h-3.5" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
