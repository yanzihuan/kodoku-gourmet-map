"use client";

import { CATEGORIES } from "@/data/categories";
import {
  SOURCE,
  seriesMessageKey,
  statusMessageKey,
  type Restaurant,
  type SeasonMeta,
} from "@/data";
import {
  CITY_OPTIONS,
  COUNTRY_OPTIONS,
  DISTRICT_OPTIONS,
  REGION_OPTIONS,
} from "@/data/geography";
import { LOCALES, MESSAGES, type Locale, type Messages } from "@/i18n/messages";

export type Filters = {
  categories: Set<string>;
  seasons: Set<string>;
  query: string;
  openOnly: boolean;
  country: string;
  region: string;
  city: string;
  district: string;
};

export default function Sidebar({
  allSeasons,
  categoryCounts,
  filtered,
  filters,
  onFilters,
  selectedId,
  onSelect,
  total,
  locale,
  messages,
  onLocale,
}: {
  allSeasons: SeasonMeta[];
  categoryCounts: Map<string, number>;
  filtered: Restaurant[];
  filters: Filters;
  onFilters: (f: Filters) => void;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  total: number;
  locale: Locale;
  messages: Messages;
  onLocale: (locale: Locale) => void;
}) {
  const toggle = (set: Set<string>, v: string): Set<string> => {
    const next = new Set(set);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    return next;
  };
  const countryNames = new Intl.DisplayNames([locale], { type: "region" });
  const regionOptions = filters.country === "JP" ? REGION_OPTIONS : [];
  const cityOptions = filters.country
    ? CITY_OPTIONS.filter(
        (city) =>
          city.country === filters.country &&
          (!filters.region || city.regionId === filters.region),
      )
    : [];
  const districtOptions = filters.city
    ? DISTRICT_OPTIONS.filter((district) => district.cityId === filters.city)
    : [];
  const hasLocationFilter = Boolean(
    filters.country || filters.region || filters.city || filters.district,
  );

  return (
    <aside className="sidebar">
      <header className="side-head">
        <div className="side-head-top">
          <div className="title-jp">孤独のグルメ</div>
          <div className="side-head-actions">
            <label className="language-picker">
              <span className="sr-only">{messages.language_label}</span>
              <select
                value={locale}
                onChange={(event) => onLocale(event.target.value as Locale)}
                aria-label={messages.language_label}
              >
                {LOCALES.map((value) => (
                  <option key={value} value={value} lang={value}>
                    {MESSAGES[value].locale_name}
                  </option>
                ))}
              </select>
            </label>
            <a
              className="github-link"
              href="https://github.com/Janlaywss/kodoku-gourmet-map"
              target="_blank"
              rel="noreferrer"
              aria-label={messages.github_label}
              title={messages.github_label}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.293-.124-.317-.66-1.293-1.128-1.554-.385-.206-.935-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.485-2.475-.275-5.06-1.238-5.06-5.5 0-1.21.426-2.2 1.128-2.97-.11-.275-.495-1.402.11-2.929 0 0 .921-.288 3.025 1.128A10.193 10.193 0 0 1 12 6.861c.935 0 1.87.124 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.527.22 2.654.11 2.929.701.77 1.127 1.746 1.127 2.97 0 4.276-2.599 5.225-5.073 5.5.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.77.522A11.01 11.01 0 0 0 23 12C23 5.923 18.077 1 12 1Z"
                />
              </svg>
            </a>
          </div>
        </div>
        <h1>{messages.title}</h1>
        <p className="subtitle">{messages.subtitle(total, filtered.length)}</p>
        <div className="source-summary">
          <div className="source-summary-title">
            <span>{messages.source_label}：</span>
            <a href={SOURCE.url} target="_blank" rel="noreferrer">
              {SOURCE.title}
            </a>
          </div>
          <div className="source-summary-meta">
            {SOURCE.updated && `${messages.source_updated(SOURCE.updated)} · `}
            {messages.footer}
          </div>
        </div>
      </header>

      <div className="side-section">
        <input
          className="search"
          type="search"
          placeholder={messages.search_placeholder}
          aria-label={messages.search_placeholder}
          value={filters.query}
          onChange={(e) => onFilters({ ...filters, query: e.target.value })}
        />
      </div>

      <div className="side-section">
        <div className="section-head">
          <span>{messages.section_location}</span>
          {hasLocationFilter && (
            <button
              className="clear-btn"
              onClick={() =>
                onFilters({
                  ...filters,
                  country: "",
                  region: "",
                  city: "",
                  district: "",
                })
              }
            >
              {messages.clear}
            </button>
          )}
        </div>
        <div className="geo-filters">
          <label className="geo-field geo-country">
            <span>{messages.country_label}</span>
            <select
              value={filters.country}
              onChange={(event) =>
                onFilters({
                  ...filters,
                  country: event.target.value,
                  region: "",
                  city: "",
                  district: "",
                })
              }
            >
              <option value="">{messages.all_countries}</option>
              {COUNTRY_OPTIONS.map((country) => (
                <option key={country.code} value={country.code}>
                  {countryNames.of(country.code) ?? country.code} ({country.count})
                </option>
              ))}
            </select>
          </label>
          {filters.country === "JP" && (
            <label className="geo-field geo-region">
              <span>{messages.region_label}</span>
              <select
                value={filters.region}
                onChange={(event) =>
                  onFilters({
                    ...filters,
                    region: event.target.value,
                    city: "",
                    district: "",
                  })
                }
              >
                <option value="">{messages.all_regions}</option>
                {regionOptions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {messages.japan_regions[region.code]} ({region.count})
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="geo-field">
            <span>{messages.city_label}</span>
            <select
              value={filters.city}
              disabled={!filters.country}
              onChange={(event) =>
                onFilters({
                  ...filters,
                  city: event.target.value,
                  district: "",
                })
              }
            >
              <option value="">{messages.all_cities}</option>
              {cityOptions.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.label} ({city.count})
                </option>
              ))}
            </select>
          </label>
          <label className="geo-field">
            <span>{messages.district_label}</span>
            <select
              value={filters.district}
              disabled={!filters.city}
              onChange={(event) =>
                onFilters({ ...filters, district: event.target.value })
              }
            >
              <option value="">{messages.all_districts}</option>
              {districtOptions.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.label} ({district.count})
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="side-section">
        <div className="section-head">
          <span>{messages.section_category}</span>
          {filters.categories.size > 0 && (
            <button
              className="clear-btn"
              onClick={() => onFilters({ ...filters, categories: new Set() })}
            >
              {messages.clear}
            </button>
          )}
        </div>
        <div className="chips">
          {CATEGORIES.map((c) => {
            const count = categoryCounts.get(c.name) ?? 0;
            if (count === 0) return null;
            const active =
              filters.categories.size === 0 || filters.categories.has(c.name);
            return (
              <button
                key={c.name}
                className={`chip${active ? "" : " chip-off"}${
                  filters.categories.has(c.name) ? " chip-on" : ""
                }`}
                style={{ "--c": c.color } as React.CSSProperties}
                onClick={() =>
                  onFilters({
                    ...filters,
                    categories: toggle(filters.categories, c.name),
                  })
                }
              >
                <i className="dot" />
                {c.emoji} {messages.categories[c.key]}
                <em>{count}</em>
              </button>
            );
          })}
        </div>
      </div>

      <div className="side-section">
        <div className="section-head">
          <span>{messages.section_season}</span>
          {filters.seasons.size > 0 && (
            <button
              className="clear-btn"
              onClick={() => onFilters({ ...filters, seasons: new Set() })}
            >
              {messages.clear}
            </button>
          )}
        </div>
        <div className="chips chips-season">
          {allSeasons.map((s) => {
            const message_key = seriesMessageKey(s.key);
            return (
              <button
                key={s.key}
                className={`chip chip-plain${
                  filters.seasons.has(s.key) ? " chip-on" : ""
                }`}
                onClick={() =>
                  onFilters({ ...filters, seasons: toggle(filters.seasons, s.key) })
                }
              >
                {message_key ? messages.series[message_key] : s.num}
              </button>
            );
          })}
        </div>
        <label className="open-only">
          <input
            type="checkbox"
            checked={filters.openOnly}
            onChange={(e) => onFilters({ ...filters, openOnly: e.target.checked })}
          />
          {messages.open_only}
        </label>
      </div>

      <div className="side-section list-section">
        <div className="section-head">
          <span>{messages.section_list}</span>
        </div>
        <ul className="rlist">
          {filtered.map((r) => {
            const text = r.i18n?.[locale];
            return (
              <li key={r.id}>
                <button
                  className={`ritem${r.id === selectedId ? " ritem-on" : ""}${
                    r.status === "已闭店" ? " ritem-closed" : ""
                  }`}
                  onClick={() => onSelect(r.id)}
                >
                  <i
                    className="dot"
                    style={
                      {
                        "--c": CATEGORIES.find((c) => c.name === r.category)
                          ?.color,
                      } as React.CSSProperties
                    }
                  />
                  <span className="ritem-main">
                    <span className="ritem-name">{r.name}</span>
                    <span className="ritem-sub">
                      {text?.area ?? r.area} · {text?.dish ?? r.dish}
                    </span>
                  </span>
                  <span className="ritem-right">
                    <span className="ritem-ep">
                      {messages.episode_badge(r.seasonKey, r.episode)}
                    </span>
                    {r.status === "已闭店" && (
                      <span className="ritem-st">
                        {messages.status[statusMessageKey(r.status)]}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="empty">{messages.empty}</li>
          )}
        </ul>
      </div>
    </aside>
  );
}
