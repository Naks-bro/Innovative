"""
TISAP Windows Agent
A lightweight desktop app that simulates employee actions and reports to FastAPI backend.
"""

import tkinter as tk
from tkinter import ttk, messagebox
import requests
from datetime import datetime
import json

# Configuration
API_URL = "http://localhost:8000/api/events"
DEFAULT_USER_ID = "employee@corp.com"
CAMPAIGN_ID = "camp-desktop"
SCENARIO_ID = "win-agent"
CHANNEL = "endpoint"

class TISAPAgent:
    def __init__(self, root):
        self.root = root
        self.root.title("TISAP Windows Agent")
        self.root.geometry("450x400")
        self.root.resizable(False, False)
        
        # Configure colors
        self.bg_color = "#f0f9ff"
        self.primary_color = "#0d9488"
        self.secondary_color = "#0284c7"
        
        self.root.configure(bg=self.bg_color)
        
        self.create_widgets()
        
    def create_widgets(self):
        # Header Frame
        header_frame = tk.Frame(self.root, bg=self.secondary_color, height=80)
        header_frame.pack(fill=tk.X, padx=0, pady=0)
        header_frame.pack_propagate(False)
        
        # Company Logo/Icon
        icon_label = tk.Label(
            header_frame,
            text="🛡️",
            font=("Segoe UI", 32),
            bg=self.secondary_color,
            fg="white"
        )
        icon_label.pack(pady=10)
        
        # Company Name
        title_label = tk.Label(
            header_frame,
            text="TISAP Security Awareness",
            font=("Segoe UI", 16, "bold"),
            bg=self.secondary_color,
            fg="white"
        )
        title_label.pack()
        
        # Main Content Frame
        content_frame = tk.Frame(self.root, bg=self.bg_color)
        content_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        # User ID Section
        user_frame = tk.Frame(content_frame, bg=self.bg_color)
        user_frame.pack(fill=tk.X, pady=(0, 20))
        
        user_label = tk.Label(
            user_frame,
            text="User ID:",
            font=("Segoe UI", 10),
            bg=self.bg_color,
            fg="#374151"
        )
        user_label.pack(anchor=tk.W)
        
        self.user_id_var = tk.StringVar(value=DEFAULT_USER_ID)
        user_entry = tk.Entry(
            user_frame,
            textvariable=self.user_id_var,
            font=("Segoe UI", 11),
            relief=tk.SOLID,
            borderwidth=1
        )
        user_entry.pack(fill=tk.X, pady=(5, 0), ipady=5)
        
        # Instructions
        info_label = tk.Label(
            content_frame,
            text="Simulate employee actions:",
            font=("Segoe UI", 10, "bold"),
            bg=self.bg_color,
            fg="#374151"
        )
        info_label.pack(anchor=tk.W, pady=(0, 10))
        
        # Action Buttons
        btn_style = {
            "font": ("Segoe UI", 11, "bold"),
            "relief": tk.FLAT,
            "cursor": "hand2",
            "borderwidth": 0,
            "pady": 12
        }
        
        # Open File Button
        self.btn_open = tk.Button(
            content_frame,
            text="📎 Open File",
            bg=self.primary_color,
            fg="white",
            activebackground="#0f766e",
            activeforeground="white",
            command=lambda: self.send_event("attachment_opened"),
            **btn_style
        )
        self.btn_open.pack(fill=tk.X, pady=5)
        
        # Execute Script Button
        self.btn_execute = tk.Button(
            content_frame,
            text="⚡ Execute Script",
            bg="#f59e0b",
            fg="white",
            activebackground="#d97706",
            activeforeground="white",
            command=lambda: self.send_event("file_executed"),
            **btn_style
        )
        self.btn_execute.pack(fill=tk.X, pady=5)
        
        # Report Threat Button
        self.btn_report = tk.Button(
            content_frame,
            text="🚨 Report Threat",
            bg="#10b981",
            fg="white",
            activebackground="#059669",
            activeforeground="white",
            command=lambda: self.send_event("reported_real"),
            **btn_style
        )
        self.btn_report.pack(fill=tk.X, pady=5)
        
        # Status Label
        self.status_label = tk.Label(
            content_frame,
            text="Ready",
            font=("Segoe UI", 9),
            bg=self.bg_color,
            fg="#6b7280"
        )
        self.status_label.pack(pady=(15, 0))
        
        # Footer
        footer_label = tk.Label(
            self.root,
            text=f"API: {API_URL}",
            font=("Segoe UI", 8),
            bg=self.bg_color,
            fg="#9ca3af"
        )
        footer_label.pack(side=tk.BOTTOM, pady=10)
    
    def send_event(self, action):
        """Send event to FastAPI backend"""
        user_id = self.user_id_var.get().strip()
        
        if not user_id:
            messagebox.showwarning("Input Required", "Please enter a User ID")
            return
        
        # Disable buttons during request
        self.set_buttons_state(tk.DISABLED)
        self.status_label.config(text="Sending...", fg="#6b7280")
        self.root.update()
        
        payload = {
            "user_id": user_id,
            "campaign_id": CAMPAIGN_ID,
            "scenario_id": SCENARIO_ID,
            "channel": CHANNEL,
            "action": action,
            "timestamp": datetime.now().isoformat()
        }
        
        try:
            response = requests.post(
                API_URL,
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=5
            )
            
            if response.status_code == 200:
                self.status_label.config(text="✓ Event sent successfully!", fg="#10b981")
                messagebox.showinfo(
                    "Success",
                    f"Action '{action}' reported successfully!\n\nUser: {user_id}"
                )
            else:
                self.status_label.config(
                    text=f"✗ Failed (HTTP {response.status_code})",
                    fg="#ef4444"
                )
                messagebox.showerror(
                    "Error",
                    f"Failed to send event.\nHTTP {response.status_code}\n{response.text}"
                )
        
        except requests.exceptions.ConnectionError:
            self.status_label.config(text="✗ Connection failed", fg="#ef4444")
            messagebox.showerror(
                "Connection Error",
                f"Could not connect to backend.\n\nMake sure FastAPI is running at:\n{API_URL}"
            )
        
        except requests.exceptions.Timeout:
            self.status_label.config(text="✗ Request timeout", fg="#ef4444")
            messagebox.showerror("Timeout", "Request timed out after 5 seconds")
        
        except Exception as e:
            self.status_label.config(text="✗ Error occurred", fg="#ef4444")
            messagebox.showerror("Error", f"An error occurred:\n{str(e)}")
        
        finally:
            # Re-enable buttons
            self.set_buttons_state(tk.NORMAL)
    
    def set_buttons_state(self, state):
        """Enable or disable all action buttons"""
        self.btn_open.config(state=state)
        self.btn_execute.config(state=state)
        self.btn_report.config(state=state)

def main():
    root = tk.Tk()
    app = TISAPAgent(root)
    root.mainloop()

if __name__ == "__main__":
    main()
