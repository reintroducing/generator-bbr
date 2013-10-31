# Require any additional compass plugins here.
# require "susy"

# Set this to the root of your project when deployed
http_path = ""
sass_dir = "app/sass"
css_dir = "app/css"
fonts_dir = "app/css/fonts"
images_dir = "app/images"
javascripts_dir = "app/js"

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# You can select your preferred output style here (can be overridden via the command line):
# :expanded or :nested or :compact or :compressed
if environment == :development
    output_style = :expanded
else
    output_style = :compressed
    line_comments = false
end

asset_cache_buster :none