alter table public.platforms
  add column if not exists "allProjectsReferralLink" text;

alter table public.referral_clicks
  add column if not exists referral_type text not null default 'individual_project';

update public.referral_clicks
set referral_type = 'individual_project'
where referral_type is null;

grant insert on public.referral_clicks to anon, authenticated;
grant select on public.referral_clicks to authenticated;
grant usage, select on sequence public.referral_clicks_id_seq to anon, authenticated;
