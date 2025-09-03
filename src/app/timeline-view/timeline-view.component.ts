import { Component, signal, computed, ChangeDetectionStrategy, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface for type safety
interface Report {
  id: number;
  title: string;
  department: string;
  status: 'Completed' | 'In Progress' | 'Pending Review';
  date: string;
  description: string;
  fileType: string;
}

@Component({
  selector: 'app-timeline-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-view.component.html',
  styleUrl: './timeline-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineViewComponent implements AfterViewInit {
  @ViewChildren('deptBtn') deptButtons!: QueryList<ElementRef<HTMLButtonElement>>;
  @ViewChildren('statusBtn') statusButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  readonly departmentOptions = ['All', 'Engineering', 'Marketing', 'Finance', 'Human Resources'];
  readonly statusOptions = ['All', 'Completed', 'In Progress', 'Pending Review'];
  private allReports = signal<Report[]>([
    { id: 1, title: "Q4 Financial Summary", department: "Finance", status: "Completed", date: "2024-10-28", description: "Comprehensive review of the fourth quarter financial performance, including revenue analysis and profit margins.", fileType: "PDF" },
    { id: 2, title: "Alpha Project Sprint Review", department: "Engineering", status: "Completed", date: "2024-10-25", description: "Technical summary of the latest sprint cycle for the Alpha Project, detailing features implemented and bugs resolved.", fileType: "DOCX" },
    { id: 3, title: "Next Gen Marketing Campaign", department: "Marketing", status: "In Progress", date: "2024-11-15", description: "Outline and strategy for the upcoming 'Next Gen' marketing initiative targeting new demographics.", fileType: "PPTX" },
    { id: 4, title: "Employee Onboarding Overhaul", department: "Human Resources", status: "Pending Review", date: "2024-10-22", description: "Proposal for a revised employee onboarding process to improve retention and initial training efficiency.", fileType: "PDF" },
    { id: 5, title: "Q3 Sales Performance Metrics", department: "Finance", status: "Completed", date: "2024-09-30", description: "Detailed metrics and analytics on the sales team's performance throughout the third quarter.", fileType: "XLSX" },
    { id: 6, title: "Project Titan - Phase 2 Planning", department: "Engineering", status: "In Progress", date: "2024-12-01", description: "Roadmap and resource allocation for the second phase of Project Titan, focusing on scalability and performance.", fileType: "DOCX" },
    { id: 7, title: "Social Media Engagement Report", department: "Marketing", status: "Completed", date: "2024-10-15", description: "Analysis of social media trends and audience engagement from the last quarter.", fileType: "PDF" },
    { id: 8, title: "IT Security Audit Findings", department: "Engineering", status: "Pending Review", date: "2024-11-05", description: "Critical findings and recommendations from the latest company-wide IT security audit.", fileType: "PDF" }
  ]);
  
  readonly statusClasses: { [key: string]: string } = { 
    "Completed": "status--completed", 
    "In Progress": "status--in-progress", 
    "Pending Review": "status--pending" 
  };

  selectedDepartment = signal('All');
  selectedStatus = signal('All');
  deptHighlightStyle = signal({ transform: 'translateX(0px)', width: '0px' });
  statusHighlightStyle = signal({ transform: 'translateX(0px)', width: '0px' });

  filteredReports = computed(() => {
    const dept = this.selectedDepartment();
    const status = this.selectedStatus();
    return this.allReports().filter(report => 
      (dept === 'All' || report.department === dept) && 
      (status === 'All' || report.status === status)
    );
  });
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.updateHighlight(this.deptButtons, 0, this.deptHighlightStyle);
      this.updateHighlight(this.statusButtons, 0, this.statusHighlightStyle);
    }, 0);
  }
  
  selectDepartment(dept: string, index: number) {
    this.selectedDepartment.set(dept);
    this.updateHighlight(this.deptButtons, index, this.deptHighlightStyle);
  }

  selectStatus(status: string, index: number) {
    this.selectedStatus.set(status);
    this.updateHighlight(this.statusButtons, index, this.statusHighlightStyle);
  }

  private updateHighlight(buttonList: QueryList<ElementRef<HTMLButtonElement>>, index: number, styleSignal: any) {
    const buttons = buttonList.toArray();
    if (buttons[index]) {
      const buttonElement = buttons[index].nativeElement;
      const newWidth = `${buttonElement.offsetWidth}px`;
      const newTransform = `translateX(${buttonElement.offsetLeft}px)`;
      styleSignal.set({ width: newWidth, transform: newTransform });
    }
  }
}

