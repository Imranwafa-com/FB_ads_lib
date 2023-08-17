from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

# ... Your code ...

# Set up Chrome options to run headless (without a GUI)
chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')

# Initialize the Chrome driver
driver = webdriver.Chrome(options=chrome_options)

# Navigate to the Facebook Ads Library page
driver.get('https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=60%25%20off&search_type=keyword_unordered&media_type=all')

# Find and process the ads
ads = driver.find_elements(By.CSS_SELECTOR, 'div.xh8yej3')

for ad in ads:
    creatives_count = len(ad.find_elements(By.CSS_SELECTOR, 'div.xeugli.x2lwn1j.x78zum5.xdt5ytf'))
    if creatives_count >= 3:
        ad_link = ad.find_element(By.CSS_SELECTOR, 'a.x1hl2dhg.x8t9es0.x1fvot60.xxio538.xjnfcd9.xq9mrsl.x1yc453h.x1h4wwuj.x1fcty0u.x1lliihq')
        ad_link_url = ad_link.get_attribute('href')

       
        # Open the ad link in a new tab (execute_script method)
        driver.execute_script('window.open(arguments[0]);', ad_link_url)

        # Add a small delay before switching
        time.sleep(2)  # You can adjust the delay as needed

        # Switch to the new tab
        driver.switch_to.window(driver.window_handles[-1])

# Close the original tab
driver.close()

# Switch to the new tab
driver.switch_to.window(driver.window_handles[-1])

# Keep the script running to prevent the browser from closing immediately
input("Press Enter to exit...")
