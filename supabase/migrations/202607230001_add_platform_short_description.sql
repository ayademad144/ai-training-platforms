alter table public.platforms
add column if not exists "shortDescription" text not null default '';

comment on column public.platforms."shortDescription" is
  'Manually authored summary displayed on homepage cards and platform previews.';
